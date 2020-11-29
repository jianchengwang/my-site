<template>
  <div id="reward-container">
    <span class="hty-icon-button button-glow" id="reward-button" title="Donate"
      onclick="var qr = document.getElementById(&quot;qr&quot;); qr.style.display = (qr.style.display === &quot;none&quot;) ? &quot;block&quot; : &quot;none&quot;;">
      <span class=".icon">Click</span>
    </span>
    <div id="reward-comment">Buye me a cup of coffee or ice coke.</div>
    <div id="qr" style="display:none;">
      <div style="display:inline-block"><a target="_blank" rel="noopener"
          href="https://blog.res.jianchengwang.info/alipay.PNG"><img loading="lazy"
            src="https://blog.res.jianchengwang.info/alipay.PNG" alt="Alipay" title="Alipay"></a>
        <div><span style="color:#00A3EE"><svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-alipay-line"></use>
            </svg></span></div>
      </div>
      <div style="display:inline-block"><a target="_blank" rel="noopener"
          href="https://blog.res.jianchengwang.info/wxpay.PNG"><img loading="lazy"
            src="https://blog.res.jianchengwang.info/wxpay.PNG" alt="WechatPay" title="WechatPay"></a>
        <div><span style="color:#2DC100"><svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wechat-pay-line"></use>
            </svg></span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#reward-container {
  padding: 10px 0;
  margin: 20px auto;
  width: 90%;
  text-align: center;
}
#reward-button {
  display: inline-block;
  text-align: center;
  padding: 0.5rem;
  color: #ff8718;
  border-radius: 100%;
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
}
.button-glow {
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-name: glowing;
  animation-direction: alternate;
}
#reward-button .icon {
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: top;
  margin-top: -0.05rem;
}

#reward-comment {
  margin-top: 0.5rem;
}

#qr img {
  width: 10rem;
  height: 10rem;
  display: inline-block;
  margin: 1rem 1rem 0 1rem;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition-property: all;
  transition-duration: 0.2s;
  transition-delay: 0s;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}
</style>