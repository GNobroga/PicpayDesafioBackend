import AppError from '../helpers/AppError';

export default class SendMailerService {
    public async send() {
        try {
            const url = 'https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6';
            const timeout = 5000; 

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const req = await fetch(url, { signal: controller.signal });
            const json = await req.json();

            clearTimeout(timeoutId);

            return json;
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            throw new AppError('Erro ao enviar email.', 500);
        }
    }
}
