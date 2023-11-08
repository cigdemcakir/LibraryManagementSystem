import {useEffect, useState} from "react";
import {Button, Form, Input, Checkbox, Header, Segment, Dropdown, DropdownProps} from "semantic-ui-react";
import {Book, BookAddCommand} from "../types/BookTypes.ts";
import {ApiResponse} from "../types/GenericTypes.ts";
import {Navigate, useNavigate} from "react-router-dom";
import axios from 'axios';
import booksPage from "./BooksPage.tsx";


enum BookGenre {
    Fiction = 0,
    NonFiction ,
    Educational,
    Mystery,
    ScienceFiction
}

const genreOptions = [
    { key: 'fiction', value: BookGenre.Fiction, text: 'Fiction' },
    { key: 'non-fiction', value: BookGenre.NonFiction, text: 'Non-Fiction' },
    { key: 'educational', value: BookGenre.Educational, text: 'Educational' },
    { key: 'mystery', value: BookGenre.Mystery, text: 'Mystery' },
    { key: 'science-fiction', value: BookGenre.ScienceFiction, text: 'Science-Fiction' },
];


interface Book {
    Title: string;
    Author: string;
    ImageUrl: string;
    Genre: BookGenre;
    IsAvailable: boolean;
}


function AddBookPage() {

    const navigate = useNavigate();


    const [book, setBook] = useState<Book>({
        Title: '',
        Author: '',
        ImageUrl: '',
        Genre: BookGenre.Fiction,
        IsAvailable: true
    });


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value });
    };

    const handleDropdownChange = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
        setBook({ ...book, Genre: data.value as BookGenre });
    };
    const handleCheckboxChange = (event: React.FormEvent<HTMLInputElement>, data: any) => {
        setBook({ ...book, IsAvailable: data.checked });
    };


    const handleBack = () => {
        navigate("/");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            console.log(book);
            const response = await fetch('https://localhost:7109/api/Books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });

            console.log(response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            navigate("/");

            return await response.json();



        } catch (error: any) {
            console.error('An error occurred:', error.response.data);
        }
    };


    return (
        <Segment padded='very'>
            <Button  style={{backgroundColor:'#dc502e', color:'white'}} onClick={handleBack} icon='arrow left' content='Back' />
            <Header as='h1' textAlign='center' className="main-header">Add Book</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Title</label>
                    <Input placeholder='Title' name="Title" onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <label>Author</label>
                    <Input placeholder='Author' name="Author" onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <label>Image URL</label>
                    <Input placeholder='URL' name="ImageUrl" onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <label>Genre</label>
                    <Dropdown placeholder='Select Genre'
                              fluid
                              selection
                              options={genreOptions}
                              value={book.Genre}
                              name='Genre'
                              onChange={handleDropdownChange} />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='Available'
                              name="IsAvailable"
                              checked={book.IsAvailable}
                              onChange={handleCheckboxChange} />
                </Form.Field>
                <Button style={{backgroundColor:'#dc502e', color:'white'}} type='submit'>Submit</Button>
            </Form>
        </Segment>
    );
}

export default AddBookPage;
