hljs.initHighlightingOnLoad()

window.googleLoginHelper
  .config('531745357390-akh3vsslmb6c3jmufjrqqr5qkif95g1i.apps.googleusercontent.com')
  .login(user => {
    $("#signin").hide()
  })
  .manual(error => {
    $("#signin").show()
  })
  .start()
