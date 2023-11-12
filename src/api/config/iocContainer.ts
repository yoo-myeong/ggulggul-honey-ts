import { Container } from 'inversify';
import { Config } from './config';
import { InjectType } from './InjectType';

export const container = new Container();

container.bind<Config>(InjectType.Config).to(Config);
