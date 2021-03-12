import { Request, Response } from 'express';
import { resolve } from 'path';
import { getCustomRepository } from 'typeorm';

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
      return response.status(400).json({
        error: "User does not exists"
      });
    }

    const survey = await surveyRepository.findOne({ id: survey_id });
    if (!survey) {
      return response.status(400).json({
        error: "Survey does not exists"
      });
    }

    // send email
    const path = resolve(__dirname, "..", "views", "emails", "nps.hbs");
    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: `${host}/answers`
      // link: process.env.URL_MAIL
    }

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: [{ user_id: user.id }, { value: null }],
      relations: ["user", "survey"]
    });

    if (surveyUserAlreadyExists) {
      await SendMailService.execute(email, survey.title, variables, path);
      return response.status(200).json(surveyUserAlreadyExists)
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id
    })

    // save
    await surveysUsersRepository.save(surveyUser);

    await SendMailService.execute(email, survey.title, variables, path);

    return response.status(200).json(surveyUser)
  }

}

export { SendMailController }
