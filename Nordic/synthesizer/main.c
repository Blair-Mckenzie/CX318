#include <stdbool.h>
#include <stdint.h>
#include "nrf.h"
#include "app_error.h"
#include "bsp.h"
#include "nrf_delay.h"
#include "nrf_drv_rtc.h"
#include "nrf_drv_clock.h"
#include "app_pwm.h"

#define COMPARE_COUNTERTIME  (3UL) 

const nrf_drv_rtc_t rtc = NRF_DRV_RTC_INSTANCE(0);

APP_PWM_INSTANCE(PWM1,1);                   
APP_PWM_INSTANCE(PWM2,2);
APP_PWM_INSTANCE(PWM3,3);                   
APP_PWM_INSTANCE(PWM4,4);

app_pwm_config_t pwm1_cfg;

static uint32_t output_pins[] = {16, 15, 14, 13};
static uint32_t max_duty_cycle = 50;
static uint32_t min_duty_cycle = 5;
static uint32_t duty_cycle_freq = 5;

uint32_t cur_duty_cycle = 2;
bool duty_cycle_rising = false;
bool notes_change = false;

void pwm_ready_callback(uint32_t pwm_id)
{
    
}

void modulate_duty_cycle()
{
    app_pwm_channel_duty_set(&PWM1, 0, cur_duty_cycle);
    app_pwm_channel_duty_set(&PWM2, 0, cur_duty_cycle);
    app_pwm_channel_duty_set(&PWM3, 0, cur_duty_cycle);
    app_pwm_channel_duty_set(&PWM4, 0, cur_duty_cycle);

    if(cur_duty_cycle >= max_duty_cycle)
        duty_cycle_rising = false;
     else if(cur_duty_cycle <= min_duty_cycle)
        duty_cycle_rising = true;

     if(duty_cycle_rising)
        cur_duty_cycle++;
    else
        cur_duty_cycle--;
}

static void rtc_handler(nrf_drv_rtc_int_type_t int_type)
{
    if (int_type == NRF_DRV_RTC_INT_COMPARE0)
    {
        
    }
    else if (int_type == NRF_DRV_RTC_INT_TICK)
    {
        modulate_duty_cycle();
    }
}

static void lfclk_config(void)
{
    ret_code_t err_code = nrf_drv_clock_init();
    APP_ERROR_CHECK(err_code);

    nrf_drv_clock_lfclk_request(NULL);
}

static void rtc_config(void)
{
    uint32_t err_code;

    nrf_drv_rtc_config_t config = NRF_DRV_RTC_DEFAULT_CONFIG;
    config.prescaler = (int)(32768 / ((max_duty_cycle - min_duty_cycle) * 2) / duty_cycle_freq);
    err_code = nrf_drv_rtc_init(&rtc, &config, rtc_handler);
    APP_ERROR_CHECK(err_code);

    nrf_drv_rtc_tick_enable(&rtc,true);

    err_code = nrf_drv_rtc_cc_set(&rtc,0,COMPARE_COUNTERTIME * 8,true);
    APP_ERROR_CHECK(err_code);

    nrf_drv_rtc_enable(&rtc);
}

void generate_tones(uint32_t freq[])
{
    app_pwm_config_t pwm1_cfg = APP_PWM_DEFAULT_CONFIG_1CH(1000000 / freq[0], output_pins[0]);
    app_pwm_config_t pwm2_cfg = APP_PWM_DEFAULT_CONFIG_1CH(1000000 / freq[1], output_pins[1]);
    app_pwm_config_t pwm3_cfg = APP_PWM_DEFAULT_CONFIG_1CH(1000000 / freq[2], output_pins[2]);
    app_pwm_config_t pwm4_cfg = APP_PWM_DEFAULT_CONFIG_1CH(1000000 / freq[3], output_pins[3]);

    ret_code_t err_code;
    err_code = app_pwm_init(&PWM1, &pwm1_cfg, pwm_ready_callback);
    APP_ERROR_CHECK(err_code);
    err_code = app_pwm_init(&PWM2, &pwm2_cfg, pwm_ready_callback);
    APP_ERROR_CHECK(err_code);
    err_code = app_pwm_init(&PWM3, &pwm3_cfg, pwm_ready_callback);
    APP_ERROR_CHECK(err_code);
    err_code = app_pwm_init(&PWM4, &pwm4_cfg, pwm_ready_callback);
    APP_ERROR_CHECK(err_code);

    app_pwm_enable(&PWM1);
    app_pwm_enable(&PWM2);
    app_pwm_enable(&PWM3);
    app_pwm_enable(&PWM4);

    app_pwm_channel_duty_set(&PWM1, 0, max_duty_cycle);
    app_pwm_channel_duty_set(&PWM2, 0, max_duty_cycle);
    app_pwm_channel_duty_set(&PWM3, 0, max_duty_cycle);
    app_pwm_channel_duty_set(&PWM4, 0, max_duty_cycle);
}

int main(void)
{
    lfclk_config();
    rtc_config();

    uint32_t freq[] = {554, 698, 831, 1046}; // Db, F, Ab, C
    //uint32_t freq[] = {277, 349, 415, 523}; // Db, F, Ab, C
    generate_tones(freq);
}
