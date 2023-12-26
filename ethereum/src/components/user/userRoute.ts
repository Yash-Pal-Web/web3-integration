import { Router } from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import Uservalidator from './userValidation';
import User from './userController';

const route = Router();

/**
 * @method POST
 * @route api/v1/user/create
 * @access PUBLIC
 * @description Route to create new user
 */
//route.post('/create', Uservalidator.createUserValidation, User.createUser);

route.post('/create', User.createUser);
route.post('/login', User.loginUser);
route.post('/userkyc');

/**
 * @method POST
 * @route api/v1/user/update
 * @access PUBLIC
 * @description Route to update existing user
 */
// route.post('/update', Uservalidator.updateValidation, User.updateUser);

/**
 * @method GET
 * @route api/v1/user/user-list
 * @queryParms api/v1/user/user-list
 * @access PUBLIC
 * @description Route to fetch user list
 */
// route.get('/user-list', User.getUserList);

/**
 * @method GET
 * @route api/v1/user/:userid
 * @access PUBLIC
 * @description Route to fetch user information
 */
// route.get('/:userid', User.getUser);

/**
 * @method DELETE
 * @route api/v1/user/:userid
 * @access PUBLIC
 * @description Route to delete user from database
 */
// route.delete('/:userid', User.deleteUser);

export default route;
