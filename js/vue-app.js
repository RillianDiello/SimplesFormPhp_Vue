var vue = new Vue({
    el: "#app",
    data:  {
        error : {valueOfCar : "*", taxPercent : "*", numInstalments: "*"},
        calculator : { valueOfCar : "", taxPercent : "", numInstalments:""},
        //urlPost : "http://localhost/VUE-implesFormPhp_Vue/app/calculator.php",
        disabledButton : false,
        messageResult : ""
    },

    methods: {
        Send : function(){
            if(this.ValidateForm()){
              this.disabledButton = true;
              this.messageResult = "Sending, please wait!";
      
              var form = this.formData(this.calculator);
              axios.post(this.urlPost, form).then(function(response){
                console.log(response.data);
                if(response.data == "send"){
                  vue.ResetForm();
                  vue.ResetError();
                  vue.messageResult  = "Message sent successfully";
                  vue.disabledButton = false;
                }else{
                   vue.messageResult = "We were unable to send you your message, please try again later.";
                }
              });
            }
          },
          formData : function(obj){
            var formData = new FormData();
            for(var key in obj){
              formData.append(key, obj[key]);
            }
            return formData;
          },
          ValidateForm : function(){
            var error = 0;
            this.ResetError();
            if(this.calculator.valueOfCar < 4){
              this.error.valueOfCar = "Please, insert a valid valueOfCar (4 characters)";
              error++;
            }
      
            if(this.calculator.taxPercent < 0){
              this.error.taxPercent = "Invalid taxPercent";
              error++;
            }
      
            if(this.calculator.numInstalments < 4){
              this.error.numInstalments = "Invalid message (10 characters)";
              error++;
            }
      
           
            return (error === 0);
          },
          ResetForm : function(){
            this.calculator.valueOfCar = "";
            this.calculator.taxPercent = "";
            this.calculator.numInstalments = "";
            
          },
          ResetError : function(){
            this.error.valueOfCar = "*";
            this.error.taxPercent = "*";
            this.error.numInstalments = "*";
            
          },
    }
})