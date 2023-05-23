const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

// Создаем транспорт для отправки электронной почты
const transporter = nodemailer.createTransport({
  // Настройки транспорта (SMTP, SendGrid, etc.)
});

// Шаблон ссылки для сброса пароля (замените YOUR_DOMAIN на ваш домен)
const resetPasswordLink = "https://YOUR_DOMAIN/reset-password?token=";

// Массив пользователей и их сведения о паролях (в реальном приложении вы будете использовать базу данных)
const users = [
  { id: 1, email: "user@example.com", password: "oldpassword" },
  // Другие пользователи
];

// Обработчик для кнопки сброса пароля на клиенте
app.post("/reset-password-request", (req, res) => {
  const { email } = req.body;

  // Проверка наличия пользователя с указанным email в базе данных
  const user = users.find((user) => user.email === email);

  if (!user) {
    // Если пользователь не найден, отправляем ошибку об отсутствии пользователя
    return res.status(404).json({ error: "User not found" });
  }

  // Генерация и сохранение токена сброса пароля для пользователя (в реальном приложении токен будет сохранен в базе данных)
  const resetToken = generateResetToken();

  // Отправка электронной почты с ссылкой для сброса пароля
  const mailOptions = {
    from: "noreply@example.com",
    to: user.email,
    subject: "Password Reset",
    html: `Click the following link to reset your password: <a href="${resetPasswordLink}${resetToken}">${resetPasswordLink}${resetToken}</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Error sending email" });
    }

    // Если письмо успешно отправлено, возвращаем успех клиенту
    res.json({ message: "Password reset email sent" });
  });
});

// Обработчик для перехода по ссылке с токеном сброса пароля
app.get("/reset-password", (req, res) => {
  const { token } = req.query;

  // Проверка валидности токена (в реальном приложении будет проверка в базе данных)
  const isValidToken = validateResetToken(token);

  if (!isValidToken) {
    // Если токен недействителен, выполняем перенаправление на страницу ошибки или выводим сообщение об ошибке
    return res.status(400).json({ error: "Invalid reset token" });
  }

  // Если токен действителен, выполняем перенаправление на другой сайт с передачей токена в параметрах запроса
  res.redirect(`https://new-site.com/reset-password?token=${token}`);
});

// Обработчик для сохранения нового пароля после сброса
app.post("/reset-password", (req, res) => {
  const { token, newPassword } = req.body;

  // Проверка валидности токена (в реальном приложении будет проверка в базе данных)
  const isValidToken = validateResetToken(token);

  if (!isValidToken) {
    // Если токен недействителен, возвращаем ошибку
    return res.status(400).json({ error: "Invalid reset token" });
  }

  // Обновляем пароль пользователя (в реальном приложении обновление будет происходить в базе данных)
  const user = users.find((user) => user.resetToken === token);
  user.password = newPassword;

  // Возвращаем успех клиенту
  res.json({ message: "Password reset successful" });
});

// Запуск сервера
const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

// Вспомогательные функции для генерации и проверки токена сброса пароля
function generateResetToken() {
  // Генерация уникального токена
}

function validateResetToken(token) {
  // Проверка валидности токена
}
