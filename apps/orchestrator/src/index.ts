import './style.scss';
import { accountRemoteOrigin, defaultRoute, navRemoteOrigin } from './config';
import { getOrchestratorRoots } from './dom';
import { startOrchestrator } from './orchestrator';
import { loadAccountRemote, loadNavigationRemote } from './remotes';

void startOrchestrator({
	roots: getOrchestratorRoots(),
	defaultRoute,
	navRemoteOrigin,
	accountRemoteOrigin,
	loadNavigationRemote,
	loadAccountRemote,
});
