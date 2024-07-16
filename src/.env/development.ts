class DevelopmentConfig {
  public public_key: string;
  
  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not found');
    }

    this.public_key = process.env.JWT_SECRET;
  }
}

export const config = new DevelopmentConfig();
