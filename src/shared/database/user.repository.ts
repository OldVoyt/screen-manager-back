import userModel from './user.model';
import { User } from '../model/User';
import { HttpStatus } from '../enums/http-status.enum';
import { HttpException } from '../helpers/errors/HttpException';

export class UserRepository {
  public async create(body: User) {
    const user = await userModel.create({
      ...body,
    });
    if (!user) {
      throw new HttpException('User not created!', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  public async findOrCreate(body: User) {
    const user = await userModel.findOne({ Id: body.Id });
    if (!user) {
      return this.create(body);
    }
    return user;
  }
  public async findOne(email: string) {
    const user = await userModel.findOne({ Email: email });
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  public async update(id: string, body: User) {
    const user = await userModel.findOneAndUpdate(
      { _id: id },
      {
        ...body,
      }
    );
    if (!user) {
      throw new HttpException('User not updated!', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
