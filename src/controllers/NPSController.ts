import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';

import { SurveyUserRepository } from '../repositories/SurveyUserRepository';

class NPSController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUsers = await surveyUserRepository.find({
      survey_id,
      value: Not(IsNull())
    });

    const detractors = surveyUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;

    const promoters = surveyUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;

    const passives = surveyUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;

    const total = surveyUsers.length;
    const nps = Number(
      (((promoters - detractors) / total) * 100).toFixed(2)
    );

    return response.status(200).json({
      detractors,
      promoters,
      passives,
      total,
      nps
    });
  }
}

export { NPSController };
