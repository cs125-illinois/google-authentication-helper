hljs.initHighlightingOnLoad()

window.googleLoginHelper
  .config('531745357390-akh3vsslmb6c3jmufjrqqr5qkif95g1i.apps.googleusercontent.com')
  .login(user => {
    $("#output > pre").text(JSON.stringify(user, null, 2))
    $("#signin").css('visibility', 'hidden')
  })
  .manual(error => {
    $("#signin").css('visibility', 'visible')
  })

$("#start").click(() => {
  window.googleLoginHelper.start()
})
