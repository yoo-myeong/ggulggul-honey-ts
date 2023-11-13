import { Container } from 'inversify';
import { InjectType } from './InjectType';
import { GoogleTokenHttpClient } from '../oauth/google/GoogleTokenHttpClient';

export const container = new Container();

// google
container.bind<GoogleTokenHttpClient>(InjectType.GoogleTokenHttpClient).to(GoogleTokenHttpClient);
