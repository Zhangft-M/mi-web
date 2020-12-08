var onloadCallback = function() {
  window.grecaptcha.render('grecaptcha', {
    sitekey: "6LdCuPwZAAAAAEf2DBwddyd-udY43_6AgOqt00gP",
    size: 'invisible',
    // the callback executed when the user solve the recaptcha
    callback: (response) => {
      // emit an event called verify with the response as payload
      // this.$emit('verify', response)
      // reset the recaptcha widget so you can execute it again
      // this.reset()
      console.log(response)
    }
  })
};
