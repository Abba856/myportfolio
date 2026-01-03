<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form data
    $firstName = strip_tags(trim($_POST["firstName"]));
    $firstName = str_replace(array("\r","\n"),array(" "," "),$firstName);
    $lastName = strip_tags(trim($_POST["lastName"]));
    $lastName = str_replace(array("\r","\n"),array(" "," "),$lastName);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $subject = str_replace(array("\r","\n"),array(" "," "),$subject);
    $message = trim($_POST["message"]);
    
    // Validate data
    if (empty($firstName) || empty($lastName) || empty($email) || empty($subject) || empty($message)) {
        header("Location: index.html#error");
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: index.html#error");
        exit;
    }
    
    // Prepare email
    $to = "info@codestopinfotech.com";
    $email_subject = "New Contact Form Submission: " . $subject;
    
    $email_body = "You have received a new message from your website contact form.\n\n";
    $email_body .= "Name: $firstName $lastName\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Subject: $subject\n";
    $email_body .= "Message:\n$message\n";
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        // Success - redirect back to index with success parameter
        header("Location: index.html?success=1#contact");
    } else {
        // Error - redirect back to index with error parameter
        header("Location: index.html?error=1#contact");
    }
} else {
    header("Location: index.html");
}
?>