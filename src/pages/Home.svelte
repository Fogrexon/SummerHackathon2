<script>
  import { Jumbotron, Container } from 'sveltestrap';
  import { Toast, ToastBody, ToastHeader } from 'sveltestrap';
</script>

<Jumbotron>
  <h1>
    About Us.
  </h1>
  <h3>開発メンバーのご紹介です。</h3>
</Jumbotron>
<Container>
  <p>
    今回のハッカソンに参加し、このページを作成したエンジニアの基本情報
  </p>
</Container>


  <div class="p-3"  mb-3>
    <Toast class="mr-1" >
      <ToastHeader>Fogrex</ToastHeader>
      <ToastBody>
        <p>Real Name：戛山英高</p>
        <p>University：東京工業大学2年</p>
        <p>twitter：@raincatsanddog1</p>
      </ToastBody>
    </Toast>
    <Toast class="mr-1" >
      <ToastHeader>chikuwa-taso</ToastHeader>
      <ToastBody>
        <p>Real Name：小沢怜央</p>
        <p>University：横浜国立大学2年</p>
        <p>twitter：@chikuwa_taso</p>
      </ToastBody>
    </Toast>
  </div>
