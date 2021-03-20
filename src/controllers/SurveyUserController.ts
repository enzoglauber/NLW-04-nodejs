import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { SurveyUserRepository } from '../repositories/SurveyUserRepository';

class SurveyUserController {
  async show(request: Request, response: Response) {
    const surveysUsersRepository = getCustomRepository(SurveyUserRepository);

    const all = await surveysUsersRepository.find();

    return response.json(all);
  }

}

export { SurveyUserController }
