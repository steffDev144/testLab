<?php 

if(
	!empty($_POST['name']) && 
	!empty($_POST['phone'])

	) {
	$name = $_POST['name'];
	$number = $_POST['phone'];
	require_once('phpmailer/PHPMailerAutoload.php');
	$mail = new PHPMailer;
	$mail->CharSet = 'utf-8';

	// $mail->SMTPDebug = 3;                               // Enable verbose debug output

	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'samsatower@gmail.com';                 // Наш логин
	$mail->Password = 'xtstbaushnqnbeud';                           // Наш пароль от ящика
	$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 587;                                    // TCP port to connect to
	
	$mail->setFrom('samsatower@gmail.com', 'testLab Site:');   // От кого письмо
	$mail->addAddress('steffjoneoff@gmail.com');     // Add a recipient Кому письмо
	//$mail->addAddress('ellen@example.com');               // Name is optional
	//$mail->addReplyTo('info@example.com', 'Information');
	//$mail->addCC('cc@example.com');
	//$mail->addBCC('bcc@example.com');
	//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
	//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
	$mail->isHTML(true);                                  // Set email format to HTML

	
	$mail->Subject = 'testLab, форма обратной связи';
	$mail->Body    = '
			Данные пользователя<br> 
			Имя: ' . $name . ' <br>';
	

	if(!$mail->send()) {
		return false;
	} else {
		return true;
	}
} 

else {
	echo "<p style='color: red'>Ошибка отправки заявки!</p>";
}