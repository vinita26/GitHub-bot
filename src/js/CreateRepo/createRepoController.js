import {createRepoConfirmFunction} from './createRepoService';


export function createRepoController(data){  
    createRepoConfirmFunction(data);
}

export function createRepoCancelController(){    
    createRepoCancelFunction();
}