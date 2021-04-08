import {configure, shallow} from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationItems from './NavigationItems';


configure({adapter: new Adaptor()});


describe('<NavigationItmes />', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<NavigationItems/>));

    it('should render two <NavigationItem /> elements if not authenticated.', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render three <NavigationItem /> elements if authenticated.', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should show logout link <NavigationItem /> elements if authenticated.', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});