import { Request, Response } from 'express';
import { resolve } from 'path';
import { getCustomRepository } from 'typeorm';

import { AppError } from '../errors/AppError';
import { SurveysRepository } from '../repositories/SurveyRepository';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {

  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;
    const { host } = request.headers;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveyRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveyUserRepository);

    const user = await usersRepository.findOne({ email });
    if (!user) {
      throw new AppError("User does not exists");
    }

    const survey = await surveyRepository.findOne({ id: survey_id });
    if (!survey) {
      throw new AppError("Survey does not exists");
    }

    const surveyUser = await surveysUsersRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ["user", "survey"]
    });

    // send email
    const path = resolve(__dirname, "..", "views", "emails", "nps.hbs");
    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: `${host}/answers`
      // link: process.env.URL_MAIL
    }

    if (surveyUser) {
      variables.id = surveyUser.id
      await SendMailService.execute(email, survey.title, variables, path);
      return response.status(200).json(surveyUser)
    }

    const surveyUserNew = surveysUsersRepository.create({
      user_id: user.id,
      survey_id
    })

    // save
    await surveysUsersRepository.save(surveyUserNew);

    variables.id = surveyUserNew.id;
    await SendMailService.execute(email, survey.title, variables, path);

    return response.status(200).json(surveyUserNew)
  }


}

export { SendMailController }
