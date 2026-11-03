export interface Contact {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export const defaultContact: Contact = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
}

