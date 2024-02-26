import attributes from './attributes.json';
import { StoryWrapper } from '../StoryWrapper/StoryWrapper';
import { GetInTouch } from './GetInTouch';

export default { title: 'GetInTouch' };

export function Usage() {
  return <StoryWrapper attributes={attributes} component={GetInTouch} />;
}
