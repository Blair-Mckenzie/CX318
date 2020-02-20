#include "sdk_common.h"
#include "ble_srv_common.h"
#include "ble_synth_note_service.h"
#include <string.h>
#include <stdio.h>
#include <math.h>
#include "nrf_gpio.h"
#include "boards.h"
#include "nrf_log.h"

/**@brief Function for adding the Custom Value characteristic.
 *
 * @param[in]   p_synth_note        Custom Service structure.
 * @param[in]   p_synth_note_init   Information needed to initialize the service.
 *
 * @return      NRF_SUCCESS on success, otherwise an error code.
 */
static ret_code_t synth_note_char_add(ble_synth_note_t * p_synth_note, const ble_synth_note_init_t * p_synth_note_init)
{
    ret_code_t          err_code;
    ble_gatts_char_md_t char_md;
    ble_gatts_attr_md_t cccd_md;
    ble_gatts_attr_t    attr_char_value;
    ble_uuid_t          ble_uuid;
    ble_gatts_attr_md_t attr_md;

    memset(&char_md, 0, sizeof(char_md));

    char_md.char_props.read   = 1;
    char_md.char_props.write  = 1;
    char_md.char_props.notify = 0; 
    char_md.p_char_user_desc  = NULL;
    char_md.p_char_pf         = NULL;
    char_md.p_user_desc_md    = NULL;
    char_md.p_cccd_md         = NULL; 
    char_md.p_sccd_md         = NULL;

    memset(&attr_md, 0, sizeof(attr_md));

    attr_md.read_perm  = p_synth_note_init->custom_value_char_attr_md.read_perm;
    attr_md.write_perm = p_synth_note_init->custom_value_char_attr_md.write_perm;
    attr_md.vloc       = BLE_GATTS_VLOC_STACK;
    attr_md.rd_auth    = 0;
    attr_md.wr_auth    = 0;
    attr_md.vlen       = 0;

    ble_uuid.type = p_synth_note->uuid_type;
    ble_uuid.uuid = SYNTH_NOTE_UUID_VALUE;

    memset(&attr_char_value, 0, sizeof(attr_char_value));

    attr_char_value.p_uuid    = &ble_uuid;
    attr_char_value.p_attr_md = &attr_md;
    attr_char_value.init_len  = sizeof(uint32_t);
    attr_char_value.init_offs = 0;
    attr_char_value.max_len   = sizeof(uint32_t);

    BLE_GAP_CONN_SEC_MODE_SET_OPEN(&attr_md.read_perm);
    BLE_GAP_CONN_SEC_MODE_SET_OPEN(&attr_md.write_perm);

    err_code = sd_ble_gatts_characteristic_add(p_synth_note->service_handle, &char_md,
                                               &attr_char_value,
                                               &p_synth_note->custom_value_handles);
    if (err_code != NRF_SUCCESS)
    {
        return err_code;
    }

    return NRF_SUCCESS;
}

ret_code_t ble_synth_note_init(ble_synth_note_t * p_synth_note, const ble_synth_note_init_t * p_synth_note_init)
{
    if (p_synth_note == NULL || p_synth_note_init == NULL)
    {
        return NRF_ERROR_NULL;
    }

    ret_code_t err_code;
    ble_uuid_t ble_uuid;

    // Initialize service structure
    p_synth_note->conn_handle               = BLE_CONN_HANDLE_INVALID;

    // Add Synth Note Service UUID
    ble_uuid128_t base_uuid = {SYNTH_NOTE_UUID_BASE};
    err_code =  sd_ble_uuid_vs_add(&base_uuid, &p_synth_note->uuid_type);
    VERIFY_SUCCESS(err_code);

    ble_uuid.type = p_synth_note->uuid_type;
    ble_uuid.uuid = SYNTH_NOTE_UUID_SERVICE;

    // Initialize service structure
    p_synth_note->evt_handler               = p_synth_note_init->evt_handler;
    p_synth_note->conn_handle               = BLE_CONN_HANDLE_INVALID;

    // Add the Synth Note Service
    err_code = sd_ble_gatts_service_add(BLE_GATTS_SRVC_TYPE_PRIMARY, &ble_uuid, &p_synth_note->service_handle);
    if (err_code != NRF_SUCCESS)
    {
        return err_code;
    }
    return synth_note_char_add(p_synth_note, p_synth_note_init);
}

/**@brief Function for handling the Connect event.
 *
 * @param[in]   p_cus       Custom Service structure.
 * @param[in]   p_ble_evt   Event received from the BLE stack.
 */
static void on_connect(ble_synth_note_t * p_synth_note, ble_evt_t const * p_ble_evt)
{
    p_synth_note->conn_handle = p_ble_evt->evt.gap_evt.conn_handle;

    ble_synth_note_evt_t evt;

    evt.evt_type = BLE_SYNTH_NOTE_EVT_CONNECTED;

    p_synth_note->evt_handler(p_synth_note, &evt);
}

/**@brief Function for handling the Disconnect event.
 *
 * @param[in]   p_synth_note       Custom Service structure.
 * @param[in]   p_ble_evt   Event received from the BLE stack.
 */
static void on_disconnect(ble_synth_note_t * p_synth_note, ble_evt_t const * p_ble_evt)
{
    UNUSED_PARAMETER(p_ble_evt);
    p_synth_note->conn_handle = BLE_CONN_HANDLE_INVALID;
}

static float * parse_note_data(uint32_t note_data)
{
    static float freqs[4];
    for(int i = 0; i < sizeof(freqs) / sizeof(uint32_t); i++)
    {
        uint8_t note_ident = (note_data >> (8 * i)) & 0xff;
        int name = (note_ident & 0xf0) >> 4;
        int octave = note_ident & 0xf;

        switch(name)
        {
            case 1:
                freqs[i] = 32.7;  // C1
                break;
            case 2:
                freqs[i] = 34.65; // Db1
                break;
            case 3:
                freqs[i] = 36.71; // D1
                break;
            case 4:
                freqs[i] = 38.89; // Eb1
                break;
            case 5:
                freqs[i] = 41.2;  // E1
                break;
            case 6:
                freqs[i] = 43.65; // F1
                break;
            case 7:
                freqs[i] = 46.25; // Gb1
                break;
            case 8:
                freqs[i] = 49;    // G1
                break;
            case 9:
                freqs[i] = 51.91; // Ab1
                break;
            case 10:
                freqs[i] = 55;    // A1
                break;
            case 11:
                freqs[i] = 58.27; // Bb1
                break;
            case 12:
                freqs[i] = 61.74; // B1
                break;
            default:
                freqs[i] = 0;
        }
        freqs[i] *= pow(2, (octave - 1));
    }
    return freqs;
}

/**@brief Function for handling the Write event.
 *
 * @param[in]   p_synth_note       Custom Service structure.
 * @param[in]   p_ble_evt   Event received from the BLE stack.
 */
static void on_write(ble_synth_note_t * p_synth_note, ble_evt_t const * p_ble_evt)
{
    ble_gatts_evt_write_t * p_evt_write = &p_ble_evt->evt.gatts_evt.params.write;
    
    // Check if the handle passed with the event matches the Custom Value Characteristic handle.
    if (p_evt_write->handle == p_synth_note->custom_value_handles.value_handle)
    {
        uint32_t sent_notes;
        memcpy(&sent_notes, p_ble_evt->evt.gatts_evt.params.write.data, p_ble_evt->evt.gatts_evt.params.write.len);
        float *freq_ptr = parse_note_data(sent_notes);
        uint32_t freqs[] = {*freq_ptr, *(freq_ptr + 1), *(freq_ptr + 2), *(freq_ptr + 3)};
        generate_tones(freqs);
    }
}

void ble_synth_note_on_ble_evt( ble_evt_t const * p_ble_evt, void * p_context)
{
    ble_synth_note_t * p_synth_note = (ble_synth_note_t *) p_context;
    
    if (p_synth_note == NULL || p_ble_evt == NULL)
    {
        return;
    }

    switch (p_ble_evt->header.evt_id)
    {
        case BLE_GAP_EVT_CONNECTED:
            on_connect(p_synth_note, p_ble_evt);
            break;

        case BLE_GAP_EVT_DISCONNECTED:
            on_disconnect(p_synth_note, p_ble_evt);
            break;
        case BLE_GATTS_EVT_WRITE:
            on_write(p_synth_note, p_ble_evt);
            break;
        default:
            // No implementation needed.
            break;
    }
}

