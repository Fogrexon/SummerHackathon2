<script>
  import { Jumbotron, Container } from 'sveltestrap';
  import { Toast, ToastBody, ToastHeader } from 'sveltestrap';
</script>

<Jumbotron>
  <h1>
    About Us.
  </h1>
</Jumbotron>
<Container>
  <p>
    基本情報
  </p>
</Container>


  <div class="prof" >
    <div>
      <Toast class="fogprof" >
        <ToastHeader>Fogrex</ToastHeader>
        <ToastBody>
          <p>Real Name：戛山英高</p>
          <p>University：東京工業大学2年</p>
          <p>twitter：<a href='https://mobile.twitter.com/Faglexon'><i class="fab fa-twitter"></i></a></p>
          <p>github：<a href=https://github.com/Fogrexon><i class="fab fa-github"></i></a></p>
        </ToastBody>
      </Toast>
    </div>
    <div>
      <Toast class="chikuwaprof" >
        <ToastHeader>chikuwa-taso</ToastHeader>
        <ToastBody>
          <p>Real Name：小沢怜央</p>
          <p>University：横浜国立大学2年</p>
          <p>twitter：<a href='https://mobile.twitter.com/chikuwa_taso'><i class="fab fa-twitter"></i></a></p>
          <p>github：<a href=https://github.com/chikuwa-taso><i class="fab fa-github"></i></a></p>
        </ToastBody>
      </Toast>
    </div>
  </div>

  <style>
    .prof {
      display:flex;
      flex-flow: column;
      width: 100%;
    }
    .prof div {
      margin: 0px auto;
      width: 100%;
      max-width: 300px;
    }
  </style>
