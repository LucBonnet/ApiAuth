import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config/config';

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  createHash(password: string) {
    this.password = bcrypt.hashSync(password, 8);
  }

  compareHash(hashedPassword: string) {
    return bcrypt.compareSync(hashedPassword, this.password);
  }

  generateToken(){
    const jwtSecret = config.jwtSecret || "";

    return jwt.sign(
      { id: this.id, email: this.email },
      jwtSecret,
      { expiresIn: "1h" }
    );
  }
}