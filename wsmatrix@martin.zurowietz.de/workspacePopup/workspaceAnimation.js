const {GObject, Meta, St} = imports.gi;

const Main = imports.ui.main;
const GWorkspaceAnimation = imports.ui.workspaceAnimation;

const { WORKSPACE_SPACING } = GWorkspaceAnimation;



class WorkspaceAnimationController extends GWorkspaceAnimation.WorkspaceAnimationController {
    _prepareWorkspaceSwitch(workspaceIndices) {
        if (this._switchData)
            return;

        const workspaceManager = global.workspace_manager;
        const nWorkspaces = workspaceManager.get_n_workspaces();

        const switchData = {};

        this._switchData = switchData;
        switchData.monitors = [];

        switchData.gestureActivated = false;
        switchData.inProgress = false;

        if (!workspaceIndices)
            workspaceIndices = [...Array(nWorkspaces).keys()];

        const monitors = Meta.prefs_get_workspaces_only_on_primary()
            ? [Main.layoutManager.primaryMonitor] : Main.layoutManager.monitors;

        for (const monitor of monitors) {
            if (Meta.prefs_get_workspaces_only_on_primary() &&
                monitor.index !== Main.layoutManager.primaryIndex)
                continue;

           // const group = new MonitorGroup(monitor, workspaceIndices, this.movingWindow);

          //  Main.uiGroup.insert_child_above(group, global.window_group);

           // switchData.monitors.push(group);
        }

        Meta.disable_unredirect_for_display(global.display);
    }
}
