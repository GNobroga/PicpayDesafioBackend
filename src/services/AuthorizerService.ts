
export default class AuthorizerService {

    public async authorize() {
        try {
            const req = await fetch('https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc');
            const json = await req.json() as { message: string };
            return json.message === 'Autorizado';
        } catch (error) {
            return false;
        }
    }
}