<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\SMTP;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';
  require 'phpmailer/src/SMTP.php';



  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';

  $mail->isSMTP();
  $mail->Host = 'smtp.mail.ru';
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;  
  $mail->SMTPAuth = true;
  $mail->Username = 'v-kochnev@internet.ru';
  $mail->Password = 'dh2pKVKLXmafpSMKMGEw';
  // $mail->Password = 'vdktyS3P4TY)';

  $mail->IsHTML(true);
  $mail->setLanguage('ru', 'phpmailer/language/');

  $subject = 'Отправка формы с сайта MESA - по умолчанию';  
  $body = '<h1>Новая отправка формы с сайта MESA - по умолчанию</h1>';


  $name = $_POST["formPopupName"];



  // $tel = $_POST["formPopupTel"];
  // $date = $_POST["formPopupDate"];
  // $mail = $_POST["formPopupEmail"];
    

  
  // else if (false) {
  // }

  $mail->Subject = $subject;  
  $mail->Body = $body;

  $mail->setFrom('v-kochnev@internet.ru');
  $mail->addAddress('2008vovchik@mail.ru'); 
  $mail->addAddress('kochnev.vladimir_91@mail.ru'); 

  if (!$mail->Send()){
    $message = 'Ошибка';
  } else {
    $message = 'Данные отправлены';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);

  




?>