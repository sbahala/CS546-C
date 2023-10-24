//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const idregex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const exportMethods={
    checkAuthorID(id){
        if(!id){
            throw `Error -- Author id not provided`;
        }else if (typeof(id) !== 'string'){
            throw `Error -- Author id: ${id} provided is not of String type`;
        }
        else if(id.trim().length === 0 || id.length === 0){
            throw `Error -- Author id cannot be empty`;
        }
        else if(!idregex.test(id.trim())){
            throw `Error -- Author id is not in a valid format`;
        }
        return id;
    },
    checkBookID(id){
        if(!id){
            throw `Error -- Book id not provided`;
        }else if (typeof(id) !== 'string'){
            throw `Error -- Book id provided is not of String type`;
        }
        else if(id.trim().length === 0 || id.length === 0){
            throw `Error -- Book id cannot be empty`;
        }
        else if(!idregex.test(id.trim())){
            throw `Error -- Book id is not in a valid format`;
        }
        return id;
    },

    datatrim(val){
        return val.trim();
    
    }
};
export default exportMethods;