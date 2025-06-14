export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Méthode non autorisée');
    return;
  }

  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    const params = new URLSearchParams(body);
    const message = params.get('message') || 'Message vide';

    const token = '7665929910:AAGejxbAgfw2a0oHpjJyzZC6XCXejFTkefI';
    const chatId = '7736182876';

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    import('https').then(https => {
      https.get(url, telegramRes => {
        if (telegramRes.statusCode === 200) {
          res.status(200).send('Message envoyé sur Telegram !');
        } else {
          res.status(500).send('Erreur Telegram');
        }
      }).on('error', () => {
        res.status(500).send('Erreur réseau');
      });
    });
  });
}
