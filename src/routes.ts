import { Router } from 'express';

import { AnswerController } from './controllers/AnswerController';
import { NPSController } from './controllers/NPSController';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';
import { SurveyUserController } from './controllers/SurveyUserController';
import { UserController } from './controllers/UserController';

const router = Router();
const userController = new UserController;
const surveyController = new SurveyController;
const sendMailController = new SendMailController;
const answerController = new AnswerController;
const npsController = new NPSController;
const surveyUserController = new SurveyUserController;

router.post("/users", userController.create);
router.get("/users", userController.show);

router.post("/surveys", surveyController.create);
router.get("/surveys", surveyController.show);

router.post("/send-mail", sendMailController.execute);

router.get("/answers/:value", answerController.execute);

router.get("/nps/:survey_id", npsController.execute);

router.get("/surveys-users", surveyUserController.show);

export { router };
