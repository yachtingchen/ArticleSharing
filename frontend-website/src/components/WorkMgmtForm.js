import React, { PropTypes } from 'react';
import { Icon, Button, Menu, Table, Container, Checkbox, Image, Form } from 'semantic-ui-react';
import intl from '../utils/intl';
import {Link} from 'react-router';
import Config from '../constants/Config';


//about the special 'bind' usage below, see: http://stackoverflow.com/questions/20377837/how-to-access-custom-attributes-from-event-object-in-react
function createRows(props) {  
  const rows = props.works.map((_) =>
    <Table.Row key={_.id}>
      <Table.Cell>
        <Image size="tiny" src={_.workImgUrl}/>
      </Table.Cell>
      <Table.Cell>
        <Checkbox checked={_.isVisible}/>
      </Table.Cell>
      <Table.Cell>
        <Checkbox checked={_.showInFrontPage}/>
      </Table.Cell>
      <Table.Cell/>
      <Table.Cell>
        <Link to={`/works/${_.id}`}>{_.title}</Link>        
      </Table.Cell>
      <Table.Cell>
        {_.createdOn}
      </Table.Cell>
      <Table.Cell>
        <Button size="mini" as={Link} to={`/work_edit/${_.id}?from=work_mgmt`} >{intl.EDIT}</Button>
      </Table.Cell>
      <Table.Cell>
        <Button size="mini" onClick={props.onDelete.bind(null, _)}>{intl.DELETE}</Button>
      </Table.Cell>
    </Table.Row>
  );

  return rows;
}

function createPagers(props){  
  const PAGE_RANGE = 5;
  const MIDDLE_TO_START = 2;

  const remainingPages = props.remainingCout / Config.PAGE_SIZE;
  const rangeStart = Math.max(props.activePage - MIDDLE_TO_START, 1);
  const rangeEnd = Math.min(rangeStart + PAGE_RANGE -1, props.activePage + remainingPages);  

  const menuItems = [];
  for(let i=rangeStart; i<=rangeEnd; i++) {
    menuItems.push(
      <Menu.Item as="a" key={i} name={i.toString()} active={i === props.activePage} onClick={props.onPageChange}>{i}</Menu.Item>
    );
  }
  return menuItems;
}

const WorkMgmtForm = (props) => (
    <Container>
        <Form error onSubmit={props.onSubmit}>
            <Form.Input name="keyWords" label={intl.KEYWORD} onChange={props.onChange}/>
            <Form.Field>
              <label>{intl.STATUS}</label>
              <Form.Group inline>
                <Form.Radio label={intl.ALL} name="isVisible" value=""
                  checked={props.isVisible === null} onChange={props.onChange} />
                <Form.Radio label={intl.VISIBLE} name="isVisible" value="true"
                  checked={props.isVisible === true} onChange={props.onChange} />
                <Form.Radio label={intl.HIDDEN} name="isVisible" value="false"
                  checked={props.isVisible === false} onChange={props.onChange} />
              </Form.Group>
            </Form.Field>
            <Form.Field>
              <label>{intl.SHOW_IN_FRONT_PAGE}</label>
              <Form.Group inline>
                <Form.Radio label={intl.ALL} name="showInFrontPage" value=""
                  checked={props.showInFrontPage === null} onChange={props.onChange} />
                <Form.Radio label={intl.NO} name="showInFrontPage" value="false"
                  checked={props.showInFrontPage === false} onChange={props.onChange} />
                <Form.Radio label={intl.YES} name="showInFrontPage" value="true" 
                  checked={props.showInFrontPage === true} onChange={props.onChange} />
              </Form.Group>
            </Form.Field>
            <Button primary type="submit">{intl.CONFIRM_AND_SEND}</Button>
        </Form>
        <Table celled>
            <Table.Header>
                <Table.Row>
                <Table.HeaderCell>{intl.WORK_PICTURE}</Table.HeaderCell>
                <Table.HeaderCell>{intl.VISIBLE}</Table.HeaderCell>
                <Table.HeaderCell>{intl.HOME_PAGE}</Table.HeaderCell>
                <Table.HeaderCell>{intl.CATEGORY}</Table.HeaderCell>
                <Table.HeaderCell>{intl.WORK_NAME}</Table.HeaderCell>                
                <Table.HeaderCell>{intl.CREATION_DATE}</Table.HeaderCell>
                <Table.HeaderCell>{intl.EDIT}</Table.HeaderCell>
                <Table.HeaderCell>{intl.DELETE}</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                createRows(props)
              }
            </Table.Body>

            <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan="20">
                <Menu floated="right" pagination>
                    <Menu.Item as="a" icon onClick={props.onPreviousPage}>
                      <Icon name="left chevron" />
                    </Menu.Item>                    
                    {
                      createPagers(props)
                    }
                    <Menu.Item as="a" icon onClick={props.onNextPage}>
                      <Icon name="right chevron" />
                    </Menu.Item>
                </Menu>
                </Table.HeaderCell>
            </Table.Row>
            </Table.Footer>
        </Table> 
    </Container>
);

WorkMgmtForm.propTypes = {
  works: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    workImgUrl: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  })).isRequired,
  remainingCout: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default WorkMgmtForm;
