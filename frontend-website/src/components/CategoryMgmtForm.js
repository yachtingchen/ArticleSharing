import React, { PropTypes } from 'react';
import { Icon, Button, Menu, Table, Container, Checkbox, Header } from 'semantic-ui-react';
import CategoryCompactEditor from './CategoryCompactEditor';
// import intl from '../utils/intl';

const inputStyle = {
    margin: '7px'
}

const CategoryMgmtForm = () => (
    <Container>
        <Table celled singleLine>
            <Table.Header>
                <Table.Row>
                <Table.HeaderCell>大分類 <Button size="mini" >新增</Button></Table.HeaderCell>
                <Table.HeaderCell>次分類</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                  <Table.Cell>
                      <CategoryCompactEditor />
                  </Table.Cell>
                  <Table.Cell>
                      <CategoryCompactEditor />
                      <CategoryCompactEditor />
                  </Table.Cell>
                </Table.Row>
            </Table.Body>

            <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan="2">
                <Menu floated="right" pagination>
                    <Menu.Item as="a" icon>
                    <Icon name="left chevron" />
                    </Menu.Item>
                    <Menu.Item as="a">1</Menu.Item>
                    <Menu.Item as="a">2</Menu.Item>
                    <Menu.Item as="a">3</Menu.Item>
                    <Menu.Item as="a">4</Menu.Item>
                    <Menu.Item as="a" icon>
                    <Icon name="right chevron" />
                    </Menu.Item>
                </Menu>
                </Table.HeaderCell>
            </Table.Row>
            </Table.Footer>
        </Table> 
    </Container>
);

CategoryMgmtForm.propTypes = {
};

export default CategoryMgmtForm;
