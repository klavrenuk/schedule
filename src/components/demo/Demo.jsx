import React from 'react';
import {Button, Container} from 'reactstrap';

import './demo.min.css';

const buttons = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'link',
    'icon',
    'white'
];

export default function Demo() {
    return (
        <Container fluid={true}>
            <section className={'demo'}>
                <h1>Demo</h1>

                <article>
                    {
                        buttons.map((button) => {
                            return <Button color={button}>{button}</Button>
                        })
                    }
                </article>
            </section>
        </Container>
    )
}