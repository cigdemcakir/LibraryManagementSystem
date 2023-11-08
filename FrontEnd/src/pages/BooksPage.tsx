import {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import {Button, Card, Checkbox, Form, Grid, Header, Icon, Input, Segment, Image, Select, Divider } from "semantic-ui-react";
import { Book } from '../types/BookTypes';
import "../styles/BooksPage.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import CheckoutModal from "../components/CheckoutModal.tsx";
import * as signalR from "@microsoft/signalr";

const BASE_URL = import.meta.env.VITE_API_URL;

const BASE_SIGNALR_URL = import.meta.env.VITE_API_SIGNALR_URL;

const options = [
    { key: '1', text: 'Ascending', value: 'true' },
    { key: '2', text: 'Descending', value: 'false' }
];

const genreOptions = [
    { key: '0', text: 'Fiction', value: '0' },
    { key: '1', text: 'Non-Fiction', value: '1' },
    { key: '2', text: 'Educational', value: '2' },
    { key: '3', text: 'Mystery', value: '3' },
    { key: '4', text: 'Science-Fiction', value: '4' }
];

const BookGenre = {
    0: 'Fiction',
    1: 'Non-Fiction',
    2: 'Educational',
    3: 'Mystery',
    4: 'Science-Fiction',
};
function BooksPage() {

    const navigate = useNavigate();

    const [hubConnection, setHubConnection] = useState(null);

    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

    const [searchQuery, setSearchQuery] = useState('');

    const [books, setBooks] = useState<Book[]>([]);

    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

    const [selectedBookId, setSelectedBookId] = useState(null);

    useEffect(() => {
        const createHubConnection = async () => {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl('https://localhost:7109/Hubs/BookHub')
                .configureLogging(signalR.LogLevel.Information)
                .build();

            connection.on('BookCheckedOut', (bookId, loanedOutTo, dueDate) => {
                setBooks(prevBooks =>
                    prevBooks.map(book =>
                        book.id === bookId ? { ...book, loanedOutTo, dueDate, isAvailable: false } : book
                    )
                );
            });

            try {
                await connection.start();
                console.log('Connection successful!');
            } catch (err) {
                alert(err);
            }

            setHubConnection(connection);
        };

        createHubConnection();
    }, []);

    const openCheckoutModal = (bookId) => {
        setSelectedBookId(bookId);
        setIsCheckoutModalOpen(true);
    };

    const closeCheckoutModal = () => {
        setIsCheckoutModalOpen(false);
    };

    const checkoutBook = async (bookId, loanedOutTo, dueDate) => {
        try {
            console.log(bookId);
            const response = await fetch(`https://localhost:7109/api/Books/${bookId}/checkout`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({bookId, loanedOutTo, dueDate})
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            closeCheckoutModal();
            await fetchBookList();
            navigate("/");

            return await response.json();



        } catch (error: any) {
            console.error('An error occurred:', error.response.data);
        }
        closeCheckoutModal();
    };


    function getGenreString(genreId) {
        return BookGenre[genreId] || 'Unknown';
    }

    const fetchBookList = async () => {
        try {
            const response = await axios.get('https://localhost:7109/api/Books');
            setBooks(response.data);
            setFilteredBooks(response.data);
        } catch (error) {
            console.error('An error occured.', error);
        }
    };


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('https://localhost:7109/api/Books');
                setBooks(response.data);
                setFilteredBooks(response.data);
            } catch (error) {
                console.error('An error occured.', error);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredBooks(filteredBooks);
    }, [searchQuery, books]);


    const onSelectChange = (event, data) => {
        const sortedBooks = [...books].sort((a, b) => {
            if (data.value === 'true') {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });

        setBooks(sortedBooks);
    };

    const onSearchInputChange = (event, data) => {
        setSearchQuery(data.value);
    };

    const onAddButtonClick = () => {
        navigate("/books/add");
    }

    const returnBook = async (bookId) => {
        try {
            const response = await fetch(`https://localhost:7109/api/Books/${bookId}/return`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Assuming your API resets 'loanedOutTo' and 'dueDate' when it receives this request
                body: JSON.stringify({bookId})
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Refresh the book list or update the state to reflect the returned book
            const updatedBooks = books.map(book => {
                if (book.id === bookId) {
                    return { ...book, isAvailable: true, loanedOutTo: null, dueDate: null };
                }
                return book;
            });

            setBooks(updatedBooks);
            setFilteredBooks(updatedBooks);

        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const onGenreChange = (event, data) => {
        const genreValue = data.value;
        const filteredBooksByGenre = books.filter(book => book.genre.toString() === genreValue);
        setFilteredBooks(filteredBooksByGenre);
    };

    const resetFilter = () => {
        setFilteredBooks(books); // Orijinal kitap listesini geri yükle
    };


    return (
        <>
                <Header as='h2' textAlign='center' color='blue' style={{ fontSize: '36px', fontWeight: 'bold' }}></Header>
                <Segment raised style={{backgroundColor: 'white', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)', transition: '0.3s', color: '#173A3A'}}>
                    <Header as='h1' textAlign='center' className="main-header">Books</Header>
                    <div className="ui fitted segment d-flex justify-center" >
                        <Button style={{ backgroundColor: '#dc502e', color: 'white' }} onClick={onAddButtonClick}><Icon name='add circle' /> Add</Button>
                        <Input className="ml-2" icon='search' placeholder="Search" value={searchQuery} onChange={onSearchInputChange} />
                        <Select className="ml-2" placeholder='Select order' options={options} onChange={onSelectChange} />
                        <Select className="ml-2" placeholder='Filter by genre' options={genreOptions} onChange={onGenreChange} />
                        <Button style={{ marginLeft: '10px', backgroundColor: '#dc502e', color: 'white'  }} onClick={resetFilter}>Reset Filter</Button>
                    </div>
                    <Divider section />
                    <Grid container columns={4} padded >
                        {filteredBooks.map((book) => (
                            <Grid.Column key={book.id}>
                                <Card fluid style={{ height: '560px' }}>
                                    <Image src={book.imageUrl} wrapped ui={false} alt={book.title} />
                                    <Card.Content>
                                        <Card.Header>{book.title}</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>Author: {book.author}</span>
                                        </Card.Meta>
                                        <Card.Meta>
                                            <span className='genre'>Genre: {getGenreString(book.genre)}</span>
                                        </Card.Meta>
                                        <Card.Description>
                                            {book.isAvailable ? 'Available' : `Loaned: ${book.loanedOutTo}`}
                                            {book.dueDate && <div>Return Date: {new Date(book.dueDate).toLocaleDateString()}</div>}
                                        </Card.Description>
                                        <Card.Meta>
                                            {book.isAvailable ? (
                                                <Button style={{ backgroundColor: '#dc502e', color: 'white' }} onClick={() => openCheckoutModal(book.id)}>Checkout</Button>
                                            ) : (
                                                <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => returnBook(book.id)}>Return</Button>
                                            )}
                                        </Card.Meta>
                                        </Card.Content>
                                </Card>
                            </Grid.Column>
                        ))}
                    </Grid>
                </Segment>
            <CheckoutModal
                open={isCheckoutModalOpen}
                onClose={closeCheckoutModal}
                onCheckout={checkoutBook}
                bookId={selectedBookId}
            />
        </>
    )

}

export default BooksPage
