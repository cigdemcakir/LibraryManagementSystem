export type BookAddCommand = {
    title: string;
    author: string;
    imageUrl: string;
    genre: string;
    isAvailable:true;
}
export interface Book {
    id: string;
    title: string;
    author: string;
    imageUrl: string;
    genre: string
    isAvailable: boolean;
    loanedOutTo?: string;
    dueDate?: string;
}

