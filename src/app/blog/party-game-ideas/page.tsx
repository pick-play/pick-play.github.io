import Link from "next/link";

export default function PartyGameIdeasPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/blog/"
        className="text-sm text-blue-500 hover:underline mb-4 inline-block"
      >
        ← 블로그로 돌아가기
      </Link>
      <h1 className="text-3xl font-bold mb-4">
        모임이 10배 재미있어지는 파티 게임 추천 TOP 7
      </h1>
      <div className="flex items-center gap-3 text-sm text-slate-400 mb-8">
        <time>2024.12.20</time>
        <span>·</span>
        <span>읽기 7분</span>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">

        <p className="mb-4 leading-relaxed">
          친구들과 모였는데 무슨 게임을 할지 모르겠다면? 회식 자리가 어색하게 시작됐다면?
          파티 게임 하나만 있어도 분위기는 완전히 달라집니다. 준비물 없이 스마트폰 하나로 할 수 있는
          재미있는 파티 게임 7가지를 소개합니다. 인원수별 적합한 게임과 꿀팁도 함께 알려드립니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">파티 게임 고르는 기준</h2>
        <p className="mb-4 leading-relaxed">
          좋은 파티 게임에는 몇 가지 공통점이 있습니다. 규칙이 간단해서 설명이 짧아야 하고,
          모두가 참여할 수 있어야 하며, 게임 중 자연스럽게 대화가 유도되어야 합니다.
          너무 복잡하거나 특정 사람만 유리한 게임은 모임의 흐름을 끊을 수 있습니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">TOP 7 파티 게임</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">1위. 라이어 게임</h3>
        <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">추천 인원: 4~10명 | 난이도: ★★★☆☆</p>
        <p className="mb-4 leading-relaxed">
          라이어 게임은 숨어있는 거짓말쟁이(라이어)를 찾아내는 심리 게임입니다.
          한 명을 제외한 모두에게 같은 주제어(예: &quot;피자&quot;)가 주어지고, 라이어에게는 주제어가 주어지지 않습니다.
          모두 돌아가며 주제어와 관련된 한 마디를 하고, 라이어는 들키지 않으면서 다른 사람들의 말을 힌트로 주제를 추리해야 합니다.
          투표로 라이어를 찾아내면 시민 팀이 승리하고, 라이어가 끝까지 살아남으면 라이어가 승리합니다.
        </p>
        <p className="mb-4 leading-relaxed">
          <strong>꿀팁:</strong> 주제어는 너무 쉽거나 어렵지 않은 것이 좋습니다. &quot;치킨&quot;보다는 &quot;탕수육&quot;,
          &quot;야구&quot;보다는 &quot;크리켓&quot; 같은 적당히 아는 주제가 긴장감을 만듭니다.
          라이어가 된 사람은 모호한 말을 골라 들키지 않는 것이 핵심입니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">2위. 밸런스 게임</h3>
        <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">추천 인원: 2명 이상 | 난이도: ★☆☆☆☆</p>
        <p className="mb-4 leading-relaxed">
          두 가지 선택지 중 하나를 골라야 하는 게임입니다. 규칙이 없을 정도로 간단하지만,
          대화를 자연스럽게 이끌어내는 데 최고의 게임입니다.
          &quot;평생 라면만 먹기 vs 평생 치킨만 먹기&quot;, &quot;기억을 잃은 채 10억 받기 vs 기억은 있지만 1억 받기&quot; 같은
          질문이 대표적입니다. 선택 후 이유를 설명하게 하면 사람들의 가치관을 알 수 있어 더 재미있습니다.
        </p>
        <p className="mb-4 leading-relaxed">
          <strong>꿀팁:</strong> 처음에는 가벼운 질문으로 시작해 점점 개인적인 질문으로 이어가면 자연스럽게 친밀감이 높아집니다.
          &quot;둘 다 선택할 수 없다&quot;는 규칙을 철저히 지켜야 긴장감이 생깁니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">3위. 초성 퀴즈</h3>
        <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">추천 인원: 3~8명 | 난이도: ★★☆☆☆</p>
        <p className="mb-4 leading-relaxed">
          초성만 보고 단어를 맞추는 게임입니다. &quot;ㅅㄱ&quot;이라고 제시하면 &quot;사과&quot;, &quot;사기꾼&quot;, &quot;수거&quot; 등 다양한 답이 나옵니다.
          카테고리를 정해서 진행하면 더 재미있습니다. 예를 들어 &quot;음식&quot; 카테고리에서 &quot;ㄱㅊ&quot; 하면 &quot;김치&quot;,
          &quot;연예인&quot; 카테고리에서 &quot;ㅂㅊㅇ&quot; 하면 &quot;박찬욱&quot; 같은 식입니다.
        </p>
        <p className="mb-4 leading-relaxed">
          <strong>꿀팁:</strong> 초성 문제는 세 자 이상이 적당합니다. 두 자는 너무 쉽고 다섯 자 이상은 너무 어렵습니다.
          팀 대결로 진행하면 경쟁심이 생겨 더 활기찬 분위기가 됩니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">4위. 진실 or 도전</h3>
        <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">추천 인원: 3~8명 | 난이도: ★★★☆☆</p>
        <p className="mb-4 leading-relaxed">
          진실(Truth) 또는 도전(Dare) 중 하나를 선택하는 고전 파티 게임입니다.
          진실을 선택하면 어떤 질문에든 솔직하게 답해야 하고, 도전을 선택하면 주어진 미션을 수행해야 합니다.
          처음 만나는 사람들 사이에서도 급격히 친해지게 만드는 강력한 아이스 브레이킹 게임입니다.
        </p>
        <p className="mb-4 leading-relaxed">
          <strong>꿀팁:</strong> 처음부터 너무 자극적인 질문이나 미션은 역효과가 납니다.
          참여자들의 관계와 분위기에 맞는 수위를 조절하는 것이 중요합니다.
          &quot;패스&quot;권을 1인당 1회 부여하면 참여에 부담이 줄어듭니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">5위. 이상형 월드컵</h3>
        <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">추천 인원: 2명 이상 | 난이도: ★☆☆☆☆</p>
        <p className="mb-4 leading-relaxed">
          두 가지 선택지를 계속 비교해 최종 1위를 뽑는 토너먼트 형식의 게임입니다.
          음식, 연예인, 여행지, 가고 싶은 곳 등 다양한 주제로 설정할 수 있습니다.
          각자 결과를 비교하면 서로의 취향 차이를 알 수 있어 대화 소재가 풍부해집니다.
        </p>
        <p className="mb-4 leading-relaxed">
          <strong>꿀팁:</strong> 음식 이상형 월드컵을 함께 하다 보면 자연스럽게 오늘 먹을 것을 결정하는 데에도 활용할 수 있습니다.
          특히 모임 장소를 정하지 못했을 때 유용합니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">6위. 사다리 타기</h3>
        <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">추천 인원: 3~10명 | 난이도: ★☆☆☆☆</p>
        <p className="mb-4 leading-relaxed">
          사다리 타기는 공평한 결과를 원할 때 최고의 선택입니다. 술자리에서 술을 누가 시킬지 정할 때,
          팀을 나눌 때, 벌칙을 받을 사람을 정할 때 자주 사용됩니다.
          모두가 공평하게 참여하고 결과에 반발이 없다는 것이 큰 장점입니다.
        </p>
        <p className="mb-4 leading-relaxed">
          <strong>꿀팁:</strong> 결과를 보여주기 전 모두가 &quot;결과를 따르겠다&quot;는 약속을 미리 하면 나중에 불만이 나오지 않습니다.
          종이에 직접 그리면 더 재미있지만, PickPlay 사다리 타기를 사용하면 편리하게 진행할 수 있습니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">7위. 랜덤 조 뽑기</h3>
        <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">추천 인원: 6명 이상 | 난이도: ★☆☆☆☆</p>
        <p className="mb-4 leading-relaxed">
          참여자를 무작위로 팀으로 나누는 게임입니다. 팀 스포츠나 팀 게임을 할 때, 또는 모임에서
          서로 잘 모르는 사람들을 섞어 새로운 인연을 만들 때 유용합니다.
          이름을 입력하고 팀 수를 정하면 즉시 무작위로 팀이 구성됩니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">모임 상황별 추천 게임</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>처음 만나는 사람들:</strong> 밸런스 게임 → 자연스럽게 대화 시작</li>
          <li><strong>오랜 친구들:</strong> 라이어 게임, 진실 or 도전 → 더 깊은 이야기로</li>
          <li><strong>회식·직장 모임:</strong> 초성 퀴즈, 이상형 월드컵 → 부담 없이 참여</li>
          <li><strong>대규모 모임 (10명 이상):</strong> 팀 나누기 후 팀 대항전</li>
          <li><strong>음주 자리:</strong> 사다리 타기로 순서/벌칙 결정</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">게임을 더 재미있게 만드는 팁</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>규칙은 간단하게:</strong> 설명이 1분 이상 걸리면 분위기가 식습니다</li>
          <li><strong>벌칙은 가볍게:</strong> 너무 가혹한 벌칙은 참여를 꺼리게 만듭니다</li>
          <li><strong>모두가 참여하도록:</strong> 구경꾼이 생기면 게임의 재미가 반감됩니다</li>
          <li><strong>타이밍 조절:</strong> 한 게임을 너무 오래 하지 말고 적당히 끊어가세요</li>
          <li><strong>분위기 파악:</strong> 모임의 성격과 참여자에 맞는 게임을 선택하세요</li>
        </ul>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold mb-3">관련 도구</h3>
        <div className="space-y-2">
          <div>
            <Link
              href="/liar-game/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              PickPlay 라이어 게임 →
            </Link>
          </div>
          <div>
            <Link
              href="/balance-game/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              PickPlay 밸런스 게임 →
            </Link>
          </div>
          <div>
            <Link
              href="/chosung-quiz/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              PickPlay 초성 퀴즈 →
            </Link>
          </div>
          <div>
            <Link
              href="/random-team/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              PickPlay 랜덤 조 뽑기 →
            </Link>
          </div>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
          준비물 없이 스마트폰 하나로 파티 게임을 즐겨보세요. 모두 무료로 제공됩니다.
        </p>
      </div>
    </article>
  );
}
