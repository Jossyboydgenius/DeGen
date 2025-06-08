//SPDX-License-Identifier:MIT

pragma solidity 0.8.26;


library ErrorLib{

          ////manager///////////
    error Manager__Can_not_be_Address();
    error Manager__UserGov_Connot_be_Zero();
    error Manager__MinAmountCannotBezero();
    error Manager__must_Be_Manager();
    error Manager_Token_Already_Added();
    error Manager__Oracle_already_Added();
    error Manager__OnlyEntryPoint();
    error Entry__not_Registered();
    error Entry_betAmountTooBig();


    //////permission/////
    error Permssion__OnlyUserAmin();


    ///Entry
    error Entry__already_Registered();

}