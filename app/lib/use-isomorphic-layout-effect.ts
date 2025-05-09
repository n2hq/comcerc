import { useEffect, useLayoutEffect } from "react";

const useIsoMorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
export default useIsoMorphicLayoutEffect