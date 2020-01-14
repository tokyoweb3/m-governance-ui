import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import headerImage from './images/headerImage.jpg'
import image1 from './images/image-01.jpg';
import image2 from './images/image-02.jpg';
// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const headerStyle = {
  backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${headerImage})`, 
  backgroundSize: 'contain', 
  backgroundPosition:'center', 
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='M-Governance'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Next Autonomous Decision Making Platform Powered by Substrate and Polkadot.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Link to="/vote"><Button primary size='huge'>
      Create Your First Vote
      <Icon name='right arrow' />
    </Button></Link>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
            style = {headerStyle}
          >
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Vote that can scale with existing blockchains. Modular and fully customizable.
            </Header> 
            <p style={{ fontSize: '1.33em' }}>
              M-Governance is both an independent blockchain and one of many parachains on Polkadot, which is the next Internet of Blockchain.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Flexible and Customizable
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              You can choose cutting-edge voting mechanisms which best fit your needs.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src={image1}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Link to="/tutorial"><Button size='huge'>Go to Tutorial
              <Icon name='right arrow' />
            </Button></Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '3em' }}>
              Compatible with many parachains on Polkadot
            </Header>
            <p style={{ fontSize: '2em' }}>Validated voting result can be used to trigger next event through Polkadot. </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '3em' }}>
              Various voting tools and models
            </Header>
            <p style={{ fontSize: '2em' }}>
              Quadratic Voting, Lock Voting, Normal Voting
              {/* <Image avatar src={image2} />
              <b>Rick</b> Chief Technology Officer */}
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Register your certificate to join permitted voting.
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          From certificate tab, you can register your digital certificate to allow only those who have signed certificate to participate the voting. For example, you can register your country's national identity smart card to participate next municipal election voting process.
          You need Fortify app to interect with your smartcard. For more detail, please follow this link.
        </p>
        <Link to="/certificate"><Button size='large'>
          Register Certificate
        </Button></Link>
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>Case Studies</a>
        </Divider>
        <Header as='h3' style={{ fontSize: '2em' }}>
          M-Governance is compatible with Substrate account system. 
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          You can use third-party extension to insert your account. Polkadot.js is an extension like a Metamask but for substrate based app. 
        </p>
        <Button as='a' size='large'>
          I'm Still Quite Interested
        </Button>
      </Container>
    </Segment>
  </ResponsiveContainer>
)
export default HomepageLayout