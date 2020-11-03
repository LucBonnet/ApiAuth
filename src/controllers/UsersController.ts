import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import userView from '../views/users_view';

export default {
  async index(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const usersRepository = getRepository(User);
  
      const user = await usersRepository.findOne(id);

      if(!user){
        return response.status(400).json({ error: "Can't get user information"})
      }
  
      return response.json(userView.render(user));
    } catch (err) {
      console.log(err)
      return response.status(400).json({ error: "Can't get user information" });
    }
  },

  async show(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const usersRepository = getRepository(User);

      const user = await usersRepository.findOneOrFail({ where: {email: email} });
      
      if (!user) {
        return response.status(400).json({ error: "User not found" });
      }
      
      if (!(await user.compareHash(password))) {
        return response.status(400).json({ error: "Invalid password" });
      }

      return response.json({
        user,
        token: user.generateToken()
      });
    } catch (err) {
      console.log(err);
      return response.status(400).json({ error: "User authentication failed" });
    }  
  },

  async create(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;

      const usersRepository = getRepository(User);

      const userVerfication = await usersRepository.findOne({ where: {email: email} });
      
      if (userVerfication) {
        return response.status(400).json({ error: "User already exists" });
      }

      const user = new User();

      user.name = name;
      user.email = email;
      user.createHash(password);

      const newUser = await usersRepository.save(user);
      
      return response.status(201).json(userView.render(newUser));
    }catch(err) {
      console.log(err);
    }
  },

  async update(request: Request, response: Response) {

  },

  async delete(request: Request, response: Response) {

  },
}