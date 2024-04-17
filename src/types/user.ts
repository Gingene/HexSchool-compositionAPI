export type FormType = {
  name: 'email' | 'password' | 'nickname';
  label: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
};

export type SignUpType = {
  email: string;
  password: string;
  nickname?: string;
};

export type LoginType = {
  email: string;
  password: string;
  nickname?: string;
};

export type SignupData = {
  status: boolean;
  uid: string;
};

export type LoginData = {
  status: boolean;
  token: string;
  exp: number;
  nickname: string;
};

export type CheckLoginData = {
  status: boolean;
  uid: string;
  nickname: string;
};

export type ErrorData = {
  response: {
    data: {
      message: string;
    };
  };
};
