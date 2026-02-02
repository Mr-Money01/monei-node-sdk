export enum DEPOSIT_METHOD {
    BANK_TRANSFER = 'BANK_TRANSFER',
    USSD = 'USSD',
    CARD = 'CARD',
}

export enum AuthAction {
    PIN = "requires_pin",
    OTP = "requires_otp",
    REDIRECT_URL = "redirect_url",
    ADDITIONAL_FIELDS = "requires_additional_fields",
    PAYMENT_INSTRUCTIONS = "payment_Instructions"
}

export enum AuthType {
    PIN = "pin",
    OTP = "otp",
    AVS = "avs",
    REDIRECT_URL = "redirect_url",
    PAYMENT_INSTRUCTION = "payment_instruction"
}