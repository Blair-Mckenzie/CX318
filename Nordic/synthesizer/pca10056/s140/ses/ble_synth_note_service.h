#include <stdint.h>
#include <stdbool.h>
#include "ble.h"
#include "ble_srv_common.h"

#ifndef BLE_SYNTH_NOTE_H__
#define BLE_SYNTH_NOTE_H__

// Forward declaration of the ble_synth_note_t type.
typedef struct ble_synth_note_s ble_synth_note_t;  

typedef enum
{
    BLE_SYNTH_NOTE_EVT_DISCONNECTED,
    BLE_SYNTH_NOTE_EVT_CONNECTED
} ble_synth_note_evt_type_t;

/**@brief Custom Service event. */
typedef struct
{
    ble_synth_note_evt_type_t evt_type;                                  /**< Type of event. */
} ble_synth_note_evt_t;

/**@brief   Macro for defining a ble_cus instance.
 *
 * @param   _name Name of the instance.
 * @hideinitializer
 */
#define BLE_SYNTH_NOTE_DEF(_name)                                                                          \
static ble_synth_note_t _name;                                                                             \
NRF_SDH_BLE_OBSERVER(_name ## _obs,                                                                        \
                     BLE_HRS_BLE_OBSERVER_PRIO,                                                            \
                     ble_synth_note_on_ble_evt, &_name)

#define SYNTH_NOTE_UUID_BASE        {0xFE, 0x10, 0xD7, 0x1C, 0x72, 0x96, 0xBE, 0xB8,                       \
                                     0x42, 0x5C, 0xE2, 0x3A, 0xAA, 0x03, 0x8C, 0xDD}
#define SYNTH_NOTE_UUID_SERVICE     0x1400
#define SYNTH_NOTE_UUID_VALUE       0x1401    

/**@brief Custom Service event handler type. */
typedef void (*ble_synth_note_evt_handler_t) (ble_synth_note_t * p_synth_note, ble_synth_note_evt_t * p_evt);  

/**@brief Custom Service init structure. This contains all options and data needed for
 *        initialization of the service.*/
typedef struct
{
    ble_synth_note_evt_handler_t         evt_handler;                    /**< Event handler to be called for handling events in the Custom Service. */
    uint8_t                       initial_custom_value;           /**< Initial custom value */
    ble_srv_cccd_security_mode_t  custom_value_char_attr_md;      /**< Initial security level for Custom characteristics attribute */
} ble_synth_note_init_t;

/**@brief Custom Service structure. This contains various status information for the service. */
struct ble_synth_note_s
{
    ble_synth_note_evt_handler_t  evt_handler;                    /**< Event handler to be called for handling events in the Custom Service. */
    uint16_t                      service_handle;                 /**< Handle of Custom Service (as provided by the BLE stack). */
    ble_gatts_char_handles_t      custom_value_handles;           /**< Handles related to the Custom Value characteristic. */
    uint16_t                      conn_handle;                    /**< Handle of the current connection (as provided by the BLE stack, is BLE_CONN_HANDLE_INVALID if not in a connection). */
    uint8_t                       uuid_type; 
};

/**@brief Function for initializing the Custom Service.
 *
 * @param[out]  p_synth_note       Custom Service structure. This structure will have to be supplied by
 *                                 the application. It will be initialized by this function, and will later
 *                                 be used to identify this particular service instance.
 * @param[in]   p_synth_note_init  Information needed to initialize the service.
 *
 * @return      NRF_SUCCESS on successful initialization of service, otherwise an error code.
 */
ret_code_t ble_synth_note_init(ble_synth_note_t * p_synth_note, const ble_synth_note_init_t * p_synth_note_init);

/**@brief Function for handling the Application's BLE Stack events.
 *
 * @details Handles all events from the BLE stack of interest to the Battery Service.
 *
 * @note 
 *
 * @param[in]   p_ble_evt  Event received from the BLE stack.
 * @param[in]   p_context  Custom Service structure.
 */
void ble_synth_note_on_ble_evt( ble_evt_t const * p_ble_evt, void * p_context);

#endif // BLE_SYNTH_NOTE_H__