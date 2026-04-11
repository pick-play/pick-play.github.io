import Link from "next/link";

export default function TypingSpeedTipsPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/blog/"
        className="text-sm text-blue-500 hover:underline mb-4 inline-block"
      >
        ← 블로그로 돌아가기
      </Link>
      <h1 className="text-3xl font-bold mb-4">
        타이핑 속도 200% 올리는 10가지 방법
      </h1>
      <div className="flex items-center gap-3 text-sm text-slate-400 mb-8">
        <time>2024.12.18</time>
        <span>·</span>
        <span>읽기 6분</span>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">

        <p className="mb-4 leading-relaxed">
          타이핑 속도는 현대 직장인에게 매우 중요한 스킬입니다. 평균 타이핑 속도가 분당 40단어(WPM)인 사람이 80WPM이 되면
          같은 시간에 두 배의 문서를 작성할 수 있습니다. 더 중요한 것은, 타이핑이 느리면 생각의 흐름이 끊겨 글의 질도 낮아집니다.
          올바른 방법으로 훈련하면 누구나 빠르게 속도를 올릴 수 있습니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">타이핑 속도의 기준: WPM이란?</h2>
        <p className="mb-4 leading-relaxed">
          WPM(Words Per Minute)은 분당 입력하는 단어 수입니다. 일반적으로 5자를 1단어로 계산합니다.
          한국어는 영어보다 자모 조합이 필요해 같은 WPM 기준으로는 체감 속도가 조금 다를 수 있습니다.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>20 WPM 이하:</strong> 초보 수준. 두 손가락 타이핑</li>
          <li><strong>40 WPM:</strong> 일반 성인 평균</li>
          <li><strong>60~80 WPM:</strong> 업무에 불편함 없는 수준</li>
          <li><strong>100 WPM 이상:</strong> 전문가 수준 (속기사, 프로그래머 등)</li>
          <li><strong>150 WPM 이상:</strong> 상위 1% 수준</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">타이핑 속도를 올리는 10가지 방법</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">1. 홈 포지션부터 익히기</h3>
        <p className="mb-4 leading-relaxed">
          홈 포지션은 손가락을 키보드 중앙 행에 자연스럽게 올려놓은 기본 자세입니다.
          왼손은 A, S, D, F에, 오른손은 J, K, L, ;에 올려놓습니다. F와 J 키에는 손가락 위치를 알 수 있는 돌기가 있습니다.
          모든 타이핑은 이 위치에서 시작해서 이 위치로 돌아와야 합니다.
        </p>
        <p className="mb-4 leading-relaxed">
          홈 포지션을 무시하고 타이핑하면 손가락이 키보드를 &quot;찾아다니는&quot; 시간이 낭비됩니다.
          처음에는 느리게 느껴지더라도 홈 포지션에서 시작하는 습관을 들이면 장기적으로 훨씬 빨라집니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">2. 화면 보기, 키보드 보지 않기</h3>
        <p className="mb-4 leading-relaxed">
          키보드를 보면서 타이핑하면 절대로 빨라질 수 없습니다. 키보드를 보면 화면과 키보드 사이에서 시선이 오가며
          집중력이 분산되고 속도도 크게 떨어집니다. 처음에는 틀리더라도 화면만 보고 타이핑하는 연습을 해야 합니다.
          스스로 강제하려면 키보드 위에 천을 올려두는 방법도 효과적입니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">3. 정확도가 속도보다 먼저</h3>
        <p className="mb-4 leading-relaxed">
          많은 사람이 빠르게 치다가 틀리고 지우는 것을 반복합니다. 이것이 가장 큰 실수입니다.
          정확도 95% 이상을 유지하는 속도로 연습하세요. 정확하게 치는 근육 기억이 형성되면
          속도는 자연스럽게 따라옵니다. 틀릴 것 같으면 차라리 느리게 정확하게 치는 것이 훨씬 낫습니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">4. 올바른 자세와 환경 만들기</h3>
        <p className="mb-4 leading-relaxed">
          자세도 타이핑 속도에 영향을 줍니다. 팔꿈치가 90도가 되도록 의자 높이를 조절하고,
          손목이 키보드보다 약간 낮거나 수평이 되도록 합니다. 손목 패드를 사용하면 피로를 줄일 수 있습니다.
          화면은 눈높이보다 약간 아래에 위치하도록 모니터를 조정하세요.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">5. 매일 꾸준히 연습하기</h3>
        <p className="mb-4 leading-relaxed">
          타이핑은 근육 기억(Muscle Memory)의 영역입니다. 한 번에 2시간 연습하는 것보다
          매일 15~20분씩 꾸준히 연습하는 것이 훨씬 효과적입니다. 뇌와 손가락 근육이 패턴을 학습하는 데 시간이 필요합니다.
          일관된 연습이 가장 빠른 성장의 길입니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">6. 약한 손가락 집중 훈련</h3>
        <p className="mb-4 leading-relaxed">
          대부분의 사람은 약지와 소지가 약합니다. 특히 왼손 소지로 치는 A, Q, Z, Shift 키와
          오른손 소지로 치는 ;, P, Enter 키에서 속도가 느려집니다.
          이런 키들을 집중적으로 반복 연습해 약한 손가락의 근력과 정확도를 높이세요.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">7. 타이핑 연습 사이트 활용</h3>
        <p className="mb-4 leading-relaxed">
          Keybr.com, 10FastFingers.com, TypeRacer.com 같은 사이트는 체계적인 타이핑 훈련 프로그램을 제공합니다.
          한국어 타이핑은 타자연습(typing.com) 같은 사이트가 유용합니다. 게임처럼 재미있게 연습할 수 있고
          실시간으로 WPM과 정확도를 확인할 수 있어 동기 부여에도 좋습니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">8. 어려운 키 조합 집중 연습</h3>
        <p className="mb-4 leading-relaxed">
          타이핑하다가 특히 더디게 느껴지는 키 조합이 있습니다. &quot;ㅙ&quot;, &quot;ㅞ&quot; 같은 복잡한 모음이나
          자주 틀리는 특정 단어 패턴이 있다면 그것만 집중적으로 반복 연습하세요.
          약점을 찾아서 보완하는 것이 전체적인 속도 향상에 가장 효과적입니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">9. 실제 업무에 연습 적용하기</h3>
        <p className="mb-4 leading-relaxed">
          전용 연습 사이트가 아닌 실제 업무나 채팅에서도 의식적으로 연습하세요.
          이메일 작성, 메모 작성, 카카오톡 대화 등 일상의 모든 타이핑이 연습이 될 수 있습니다.
          실전 상황에서 연습하면 훨씬 빠르게 실력이 향상됩니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">10. 좋은 키보드 선택하기</h3>
        <p className="mb-4 leading-relaxed">
          키보드 품질도 속도에 영향을 줍니다. 멤브레인 키보드보다 기계식 키보드가 키감이 좋고 정확도가 높습니다.
          처음에는 저렴한 기계식 키보드로 시작해도 충분합니다. 키 간격이 너무 좁거나 키감이 나쁜 키보드는
          피로도를 높여 타이핑 속도에 부정적인 영향을 줍니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">타이핑 속도 향상 일정표</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-700">
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">기간</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">목표</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">집중 사항</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">1~2주</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">홈 포지션 완전히 익히기</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">정확도 우선, 키보드 보지 않기</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">3~4주</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">40 WPM 달성</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">약한 손가락 집중 훈련</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">2~3개월</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">60~70 WPM 달성</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">속도와 정확도 동시 향상</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">6개월 이상</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">100 WPM 이상</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">실전 연습, 꾸준한 유지</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">자주 하는 실수</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>너무 급하게 속도 올리기:</strong> 정확도가 떨어지면 오히려 역효과</li>
          <li><strong>불규칙한 연습:</strong> 일주일에 한 번 집중 연습보다 매일 조금씩이 효과적</li>
          <li><strong>키보드 계속 보기:</strong> 아무리 연습해도 발전이 없는 가장 큰 원인</li>
          <li><strong>손목 무리하게 쓰기:</strong> 반복성 스트레스 손상(RSI)이 올 수 있음. 주기적 휴식 필요</li>
        </ul>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold mb-3">관련 도구</h3>
        <Link
          href="/aim-test/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          PickPlay 타이핑 테스트 →
        </Link>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          지금 바로 타이핑 속도를 측정해보세요. WPM과 정확도를 실시간으로 확인할 수 있습니다.
        </p>
      </div>
    </article>
  );
}
