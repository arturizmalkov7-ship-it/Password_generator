function getHomePage() {
  return `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tehnium</title>
        <style>
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #0f172a, #1e293b);
            color: #e2e8f0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          .card {
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid #334155;
            border-radius: 16px;
            padding: 32px 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.25);
            text-align: center;
          }
          h1 {
            margin-bottom: 10px;
            font-size: 2rem;
          }
          p {
            margin: 0;
            color: #cbd5e1;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Tehnium</h1>
          <p>Пробный проект</p>
          <p>Модель: MAI-Code-1.1-Flash</p>
        </div>
      </body>
    </html>
  `;
}

module.exports = { getHomePage };
