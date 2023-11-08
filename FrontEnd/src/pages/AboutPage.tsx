import { Container, Header, List, Segment, Icon, Divider } from "semantic-ui-react";

function AboutPage() {
    return (
        <Container text style={{ marginTop: '3em' }}>
            <Segment piled>
                <Header as='h1' textAlign='center'  style={{ marginBottom:'1em'}} className="main-header" >
                    About Library Management System
                </Header>
                <p style={{ textAlign: 'center', marginBottom:'3em'}}>This Library Management System (LMS) is developed to facilitate the organization and tracking of book collections for book enthusiasts.</p>

                <Divider horizontal>
                    <Header as='h2'  className="main-header">
                        <Icon  className="main-header" name='list alternate outline' />
                        Features
                    </Header>
                </Divider>

                <List style={{ textAlign: 'center', marginTop:'2em'}}  relaxed='very'>
                    <List.Item>
                        <Icon name='book' className="main-header"/>
                        Easily add books within the collection.
                    </List.Item>
                    <List.Item>
                        <Icon name='exchange' className="main-header"/>
                        Record lending and return transactions of books.
                    </List.Item>
                    <List.Item>
                        <Icon name='search' className="main-header"/>
                        Search for books by title.
                    </List.Item>
                    <List.Item>
                        <Icon name='sort' className="main-header"/>
                        Sort books by title in ascending or descending order.
                    </List.Item>
                    <List.Item>
                        <Icon name='filter' className="main-header"/>
                        Filter books by genre.
                    </List.Item>
                    <List.Item>
                        <Icon name='user' className="main-header"/>
                        Create user profiles.
                    </List.Item>
                </List>

                <Divider horizontal style={{ textAlign: 'center', marginTop:'3em'}}>
                    <Header as='h2'  className="main-header" >
                        <Icon name='code' className="main-header"/>
                        Technologies
                    </Header>
                </Divider>

                <p style={{ textAlign: 'center', marginTop:'2em'}}>
                    This system is engineered with a robust tech stack, ensuring a secure, scalable, and user-friendly experience.
                    It's built on <strong>C#</strong> and <strong>.NET 7</strong>, adhering to <strong>Clean Architecture</strong> for maintainability.
                    For data handling, it uses <strong>Entity Framework Core</strong> with a <strong>SQL Server</strong> database,
                    and implements the <strong>CQRS pattern</strong> via <strong>MediatR</strong> for efficient command and query separation.
                    Real-time data synchronization is powered by <strong>SignalR</strong>, ensuring that all clients have up-to-date information without needing to refresh their browsers.
                    The front-end is crafted with <strong>React</strong>, offering a dynamic UI, complemented by
                     <strong> Semantic UI React</strong> for sleek design components. Secure authentication is provided through
                    <strong> Google Login</strong>, while <strong>Serilog</strong> and <strong>FluentValidation</strong> ensure reliable logging and data validation.
                    <strong> Axios</strong> is used for API interactions, <strong>JWT-Decode</strong> for token handling, and <strong>React Toastify</strong> for notifications.
                </p>


                <Divider horizontal style={{ textAlign: 'center', marginTop:'2em'}}>
                    <Header as='h2' className="main-header" >
                        <Icon name='mail outline' className="main-header" />
                        Contact
                    </Header>
                </Divider>
                <p style={{ textAlign: 'center', marginTop:'1em'}}>For feedback, please reach me on
                    <a href="https://www.linkedin.com/in/çiğdemçakır" target="_blank" rel="noopener noreferrer">  LinkedIn</a>
                </p>
            </Segment>
        </Container>
    );
}

export default AboutPage;
