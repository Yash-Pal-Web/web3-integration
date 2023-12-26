export default {
  SERVER_ERROR_MESSAGE: 'Something went wrong',
  INVALID_LOGIN_DETAILS: 'Invalid email or password',
  USER_NOTFOUND_ERROR: 'user not found with provided details',
};

export enum SOCKETEVENT {
  SOCKET_CONNECTED = 'socket_connected',
  KYC_UPDATED = 'kyc_updated',
  BLOCKCHAIN_TRANSACTION_STATUS = 'blockchain_transaction_status',
  WALLET_BALANCE_UPDATE = 'wallet_balance_update',
  NEW_TRANSACTION_ADDED = 'new_transaction_added',
  NEW_USER_ADDED = 'new_user_added',
  KYC_ADDED = 'kyc_added',
}

export enum OTPTYPES {
  REGISTER_USER = 'register_user',
  FORGOT_PASSWORD = 'forgot_password',
  MOBILE_VERIFICATION = 'update_mobile_verification',
  KYC_MOBILE_VERIFICATION = 'kyc_mobile_verification',
  FORGET_2FA = 'forget_2fa',
}

export enum OTPCHANNEL {
  SMS = 'sms',
}

export class CommonMessages {
  public static readonly API_RATE_LIMIT_ERROR = 'Exceeded api request limit.';
  public static readonly ERROR = 'Sorry, we are not able to process your request.Please try again later';
  public static readonly WELCOME = 'Welcome to VISHAL PAPERMART!';
  public static readonly OTP_SERVICE_UNAVAILABLE = 'OTP SMS service is currently unavailable. Please try again later.';
}

export class UserMessages {
  public static readonly USER_ALREADY = 'User already exists';
  public static readonly BANKDETAILS_NOT_FOUND = 'Error code 425.please contact technical support team.';
  public static readonly PACKAGE_NOT_FOUND = 'Error code 426.please contact technical support team.';

  //public static readonly ONE_BANK_ERROR = "User can't add more than one bank";
  public static readonly ADDRESS_VALIDATION = 'Please enter valid address';

  public static readonly API_DEPRECATED = 'Api is deprecated.';
  public static readonly OTP_VERIFIED_SUCCESSFULLY = 'Otp verified successfully.';
  public static readonly USER_PROFILE_SUCCESS = 'Profile image uploaded successfully.';
  public static readonly KYC_UPDATED = 'KYC status updated successfully.';

  public static readonly MOBILE_ALREADY_EXISTS = 'Mobile already exist.';
  public static readonly KYC_LEVEL2_REQUIRED = 'Please complete kYC level 1.';
  public static readonly KYC_LEVEL3_REQUIRED =
    'Daily 10000 buy limit reached.please complete your KYC to buy more token.';

  public static readonly OTP_MAXIMUM_LIMIT_REACHED =
    'You have reached maximum otp limit.Please wait for sometimes and try again.';

  public static readonly MOBILE_REQUIRED = 'Mobile number is required.';
  public static readonly FILE_REQUIRED = 'File is required.';
  public static readonly VERIFICATION__LEVEL_INVALID = 'Verification level is invalid.';

  public static readonly ACCESS_DENIED = 'Access denied.';
  public static readonly SIGNED_URL_FETCHED = 'Signed url fetched successfully.';

  public static readonly EMAIL_ALREADY_EXISTS = 'Email already exist.';
  public static readonly REGISTER_SUCCESS = 'Your Registration has been completed successfully.';
  public static readonly INVALID_ID = 'Invalid id.';
  public static readonly USER_ID_REQUIRED = 'User id is required';
  public static readonly USER_UPDATE_SUCCESS = 'User data updated successfully.';
  public static readonly PROFILE_UPDATE_SUCCESS = 'User profile updated successfully.';
  public static readonly AGENT_UPDATE_SUCCESS = 'Agent status updated successfully.';
  public static readonly USER_FOUND_SUCCESS = 'User data found';

  public static readonly INVALID_TOKEN = 'Invalid token passed.';
  public static readonly TOKEN_NOTFOUND = 'Token is required';

  public static readonly MESSAGE_REQUIRED = 'Rejection message is required';
  public static readonly WALLET_ALREADY = 'Wallet already exist for user.';
  public static readonly TOKEN_TYPE_ALREADY_EXISTS = 'Token Type already exist.';
  public static readonly WALLET_NOTFOUND = 'User wallet not found.';
  public static readonly GOOGLE_2FA_UPDATED = '2FA status updated.';
  public static readonly OTP_SEND = 'Otp has been sent successfully to your registered mobile number';

  public static readonly INVALID_TRANSACTION = 'Invalid transaction details.';
  public static readonly TRANSACTION_ALREADY_PROCESSED = 'Transaction already processed.';
  public static readonly OTP_EXPIRED = 'Otp expired.';
  public static readonly OTP_INVALID = 'Invalid Otp.';
  public static readonly OTP_TYPES_INVALID = 'Invalid otp types.';
  public static readonly OTP_CHANNEL_INVALID = 'Invalid otp channel.';
  public static readonly PROFILE_IMAGE_REQUIRED = 'Profile image is required.';
  public static readonly NOT_REGISTERED = 'User not registered';
  public static readonly ALREADY_EXISTS = 'User already exists.';
  public static readonly NOT_FOUND = 'User not found.';
  public static readonly FOUND_SUCCESS = 'User data found';
  public static readonly FETCH_SUCCESS = 'Fetched user successfully';
  public static readonly LOGIN_ERROR = 'Invalid credentials';
  public static readonly LOGIN_SUCCESS = 'Login successfully';
  // public static readonly NOT_VERIFIED = "Your email haven't verified yet.Please verify to continue.";
  public static readonly ALREADY_VERIFIED = 'Your email is already verified!';
  public static readonly VERIFIED_SUCCESS = 'Email Has Been Successfully Verified.';
  public static readonly LINK_EXPIRED = 'The link is expired.';
  public static readonly RESET_PASSWORD_SUCCESS = 'Your password reset successfully.';
  public static readonly RESET_PASSOWRD_ERROR = 'New and old password must be different!';
  public static readonly RESET_PASSOWRD_EMAIL_SUCESS = 'Your reset password link send to your email.';
  public static readonly INVALID_INPUT = 'Invalid input';
  public static readonly INVALID_EMAIL = 'Invalid email';
  public static readonly INVALID_LINK = 'The link is invalid';
  public static readonly CHANGE_PASSWORD_SUCCESS = 'Password changed successfully';
  public static readonly CHANGE_PASSWORD_ERROR = 'Invalid old password';
  public static readonly PASSWORD_MISMATCH = 'new password and confirm password not matched';
  public static readonly INVALID_CODE = 'Invalid reffered code';
  public static readonly INVALID_LOGIN_CREDENTIAL = 'Invalid Password';
  public static readonly INVALID_LOGIN_MOBILE = 'Password is invalid';
  public static readonly ADMIN_INVALID_LOGIN_MOBILE = 'Email or password is invalid';

  public static readonly TRANSACTION_FOUND_SUCCESS = 'Transaction data found';
  public static readonly TRANSACTION_STATUS_SUCCESS = 'Transaction status updated successfully';
}

export class BankMessage {
  public static readonly ALREADY_EXISTS = 'Bank already exists';
  public static readonly NOT_FOUND = 'Bank details not found.';
  public static readonly FOUND_SUCCESS = 'Bank data found';
  public static readonly INVALID_ID = 'Invalid id.';
  public static readonly BANK_UPDATE_SUCCESS = 'Bank details updated successfully';
  public static readonly BANK_DELETE_SUCCESS = 'Bank deleted successfully';
}
export class KycMessage {
  public static readonly KYC_FOUND_SUCCESS = 'KYC data found';
  public static readonly KYC_STATUS_SUCCESS = 'KYC status updated successfully';
  public static readonly KYC_MESSAGE_REQUIRED = 'Rejection message is required';
}
export class HttpStatusCode {
  public static readonly SUCCESSFUL = 200;
  public static readonly BAD_REQUEST = 400;
  public static readonly UN_AUTHORIZED = 401;
  public static readonly FORBIDDEN = 403;
  public static readonly NOT_FOUND = 404;
  public static readonly INTERNAL_SERVER_ERROR = 500;
  public static readonly ALREADY_EXISTS = 409;
  public static readonly RATE_LIMIT = 429;
}
