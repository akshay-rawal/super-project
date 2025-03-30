  


    class apiError extends Error{
        constructor(statusCode,message,errors=[],stack){
            super(message)
          this.statusCode = statusCode,
          this.error = errors
          this.success = false

          if(stack){
            this.stack = stack
          }else{
            // yahan pehlee this us instance object ko refer kar rha hai taki usko captureStackTrace mil jaye 
            // dusra this.construtor child inheritence ko refer kr rha hai taki usko mil jaye yeh
            Error.captureStackTrace(this,this.construtor) 
          }
        
        }
    }

    export {apiError}