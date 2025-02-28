
export interface InviteInfoResponse {
  inviteInfo: {
    _id: string;
    // brandId: string;
    cellPhone: string;
    // circleId: string;
    gender: string;
    inviteToken: string;
    // invitedAt: string;
    // registrationNumber: string;
    // status: string;
    // storeId: string;
    storeName: string;
    brandName: string;
    age: string;
    maskedName: string;
    maskedBirthDate: string;
    brandLogoUrl: string;
  };
}

export interface AcceptInviteResponse {
  acceptInvite: {
    requestId: string;
    requestTime: string;
    smsVerificationId: string;
  };
}

export interface AcceptInviteRequest {
  inviteId: string;
  token: string;
}

export interface ConnectInviteResponse {
  connectInvite: {
    code: number;
    message: string;
    success: boolean;
  };
}

export interface ConnectInviteRequest {
  inviteId: string;
  token: string;
}