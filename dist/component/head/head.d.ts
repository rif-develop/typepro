import React from "react";
interface Props {
    title: string;
    description: string;
}
declare class Head extends React.Component<Props, {}> {
    static defaultProps: {
        title: string;
        description: string;
    };
    constructor(props: Props);
    render(): JSX.Element;
}
export default Head;
//# sourceMappingURL=head.d.ts.map